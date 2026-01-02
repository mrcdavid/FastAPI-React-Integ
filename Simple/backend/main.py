import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List



class Fruit(BaseModel):
    name: str


class Fruits(BaseModel):
    fruits: List[Fruit]


app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"fruits": []}

@app.get("/fruits", response_model=Fruits)
def get_fruits():
    return Fruits(fruits=memory_db["fruits"])


@app.post("/fruits")
def add_fruit(fruit: Fruit):
    memory_db["fruits"].append(fruit)
    return fruit

# Delete a fruit by index
@app.delete("/fruits/{index}")
def delete_fruit(index: int):
    if index < 0 or index >= len(memory_db["fruits"]):
        raise HTTPException(status_code=404, detail="Fruit not found")
    memory_db["fruits"].pop(index)
    return {"message": "Fruit deleted"}

# Update a fruit by index
@app.put("/fruits/{index}", response_model=Fruit)
def update_fruit(index: int, fruit: Fruit):
    if index < 0 or index >= len(memory_db["fruits"]):
        raise HTTPException(status_code=404, detail="Fruit not found")
    
    # Update the name
    memory_db["fruits"][index] = fruit.dict()  # <-- replace dict entirely
    return fruit


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)