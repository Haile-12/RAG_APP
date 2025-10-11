from pydantic import BaseModel

class QueryRequest(BaseModel):
    question: str

class UploadResponse(BaseModel):
    filename: str
    status: str