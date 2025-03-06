from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/quotes")
def get_quotes(timeframe: str = "all_time") -> list[Quote]:
    quotes = database["quotes"]
    
    if timeframe == "all_time":
        return quotes
    
    current = datetime.now()
    filtered = []

    for quote in quotes:
        for quote in quotes:
            quote_time = datetime.fromisoformat(quote["time"])

            days = (current.timestamp() - quote_time.timestamp()) / 86400

            if timeframe == "week" and days <= 7:
                filtered.append(quote)

            elif timeframe == "month" and days <= 30:
                filtered.append(quote)

            elif timeframe == "year" and days <= 365:
                filtered.append(quote)

    return filtered