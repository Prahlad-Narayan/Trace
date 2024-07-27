import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load CSV data
companies_df = pd.read_csv('companies.csv')
locations_df = pd.read_csv('locations.csv')

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/companies", summary="Get all companies")
async def get_all_companies():
    return companies_df.to_dict(orient='records')

@app.get("/companies/{company_id}", summary="Get company details by ID")
async def get_company_details(company_id: int):
    company = companies_df[companies_df['company_id'] == company_id]
    if company.empty:
        raise HTTPException(status_code=404, detail="Company not found")
    return company.iloc[0].to_dict()

@app.get("/companies/{company_id}/locations", summary="Get locations for a specific company")
async def get_company_locations(company_id: int):
    locations = locations_df[locations_df['company_id'] == company_id]
    if locations.empty:
        raise HTTPException(status_code=404, detail="No locations found for this company")
    return locations.to_dict(orient='records')