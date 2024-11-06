from fastapi import APIRouter, HTTPException
from typing import List, Dict
from datetime import datetime, timedelta
from enum import Enum
import random


class GBACities(str, Enum):
    HONG_KONG = "Hong Kong"
    SHENZHEN = "Shenzhen"
    GUANGZHOU = "Guangzhou"
    MACAU = "Macau"
    ZHUHAI = "Zhuhai"
    DONGGUAN = "Dongguan"
    ZHONGSHAN = "Zhongshan"
    FOSHAN = "Foshan"
    HUIZHOU = "Huizhou"
    JIANGMEN = "Jiangmen"

class Terminals(str, Enum):
    # Hong Kong Terminals
    HK_AIRPORT = "Hong Kong International Airport"
    HK_MACAU_FERRY = "Hong Kong Macau Ferry Terminal"
    CHINA_FERRY = "China Ferry Terminal"
    WEST_KOWLOON = "West Kowloon Station"
    ELEMENTS = "Elements Coach Terminal"
    PRINCE_EDWARD = "Prince Edward Station"
    
    # Shenzhen Terminals
    SZ_AIRPORT = "Shenzhen Bao'an International Airport"
    SZ_SHEKOU = "Shekou Port"
    SZ_NORTH = "Shenzhen North Station"
    SZ_FUTIAN = "Futian Station"
    
    # Guangzhou Terminals
    GZ_SOUTH = "Guangzhou South Railway Station"
    GZ_EAST = "Guangzhou East Railway Station"
    GZ_AIRPORT = "Guangzhou Baiyun International Airport"
    
    # Macau Terminals
    MACAU_OUTER = "Macau Outer Harbour Ferry Terminal"
    MACAU_TAIPA = "Macau Taipa Ferry Terminal"
    
    # Zhuhai Terminals
    ZHUHAI_JIUZHOU = "Zhuhai Jiuzhou Port"
    ZHUHAI_GONGBEI = "Zhuhai Gongbei Port"

ferry_routes = [
    {
        "route_id": "F001",
        "from": GBACities.HONG_KONG,
        "to": GBACities.MACAU,
        "terminal_from": Terminals.HK_MACAU_FERRY,
        "terminal_to": Terminals.MACAU_OUTER,
        "duration_minutes": 60,
        "price": 171,
        "operator": "TurboJET"
    },
    {
        "route_id": "F002",
        "from": GBACities.HONG_KONG,
        "to": GBACities.ZHUHAI,
        "terminal_from": Terminals.CHINA_FERRY,
        "terminal_to": Terminals.ZHUHAI_JIUZHOU,
        "duration_minutes": 70,
        "price": 165,
        "operator": "CotaiJet"
    },
    {
        "route_id": "F003",
        "from": GBACities.HONG_KONG,
        "to": GBACities.MACAU,
        "terminal_from": Terminals.HK_MACAU_FERRY,
        "terminal_to": Terminals.MACAU_TAIPA,
        "duration_minutes": 65,
        "price": 175,
        "operator": "CotaiJet"
    },
    {
        "route_id": "F004",
        "from": GBACities.HONG_KONG,
        "to": GBACities.SHENZHEN,
        "terminal_from": Terminals.CHINA_FERRY,
        "terminal_to": Terminals.SZ_SHEKOU,
        "duration_minutes": 30,
        "price": 120,
        "operator": "CKS"
    },
    {
        "route_id": "F005",
        "from": GBACities.ZHUHAI,
        "to": GBACities.MACAU,
        "terminal_from": Terminals.ZHUHAI_GONGBEI,
        "terminal_to": Terminals.MACAU_OUTER,
        "duration_minutes": 20,
        "price": 80,
        "operator": "Yuet Tung"
    }
]

bus_routes = [
    {
        "route_id": "B001",
        "from": GBACities.HONG_KONG,
        "to": GBACities.SHENZHEN,
        "terminal_from": Terminals.ELEMENTS,
        "terminal_to": "Huanggang Port",
        "duration_minutes": 45,
        "price": 90,
        "operator": "Cross Boundary Coach"
    },
    {
        "route_id": "B002",
        "from": GBACities.HONG_KONG,
        "to": GBACities.GUANGZHOU,
        "terminal_from": Terminals.PRINCE_EDWARD,
        "terminal_to": Terminals.GZ_EAST,
        "duration_minutes": 180,
        "price": 250,
        "operator": "China Travel Bus"
    },
    {
        "route_id": "B003",
        "from": GBACities.HONG_KONG,
        "to": GBACities.DONGGUAN,
        "terminal_from": Terminals.ELEMENTS,
        "terminal_to": "Dongguan Bus Terminal",
        "duration_minutes": 120,
        "price": 160,
        "operator": "Trans-Island Bus"
    },
    {
        "route_id": "B004",
        "from": GBACities.HONG_KONG,
        "to": GBACities.FOSHAN,
        "terminal_from": Terminals.PRINCE_EDWARD,
        "terminal_to": "Foshan Central",
        "duration_minutes": 210,
        "price": 280,
        "operator": "China Travel Bus"
    },
    {
        "route_id": "B005",
        "from": GBACities.HONG_KONG,
        "to": GBACities.ZHONGSHAN,
        "terminal_from": Terminals.ELEMENTS,
        "terminal_to": "Zhongshan Bus Terminal",
        "duration_minutes": 150,
        "price": 200,
        "operator": "Trans-Island Bus"
    }
]

train_routes = [
    {
        "route_id": "T001",
        "from": GBACities.HONG_KONG,
        "to": GBACities.GUANGZHOU,
        "terminal_from": Terminals.WEST_KOWLOON,
        "terminal_to": Terminals.GZ_SOUTH,
        "duration_minutes": 48,
        "price": 215,
        "train_type": "High-Speed Rail"
    },
    {
        "route_id": "T002",
        "from": GBACities.HONG_KONG,
        "to": GBACities.SHENZHEN,
        "terminal_from": Terminals.WEST_KOWLOON,
        "terminal_to": Terminals.SZ_NORTH,
        "duration_minutes": 15,
        "price": 80,
        "train_type": "High-Speed Rail"
    },
    {
        "route_id": "T003",
        "from": GBACities.HONG_KONG,
        "to": GBACities.DONGGUAN,
        "terminal_from": Terminals.WEST_KOWLOON,
        "terminal_to": "Dongguan South Station",
        "duration_minutes": 30,
        "price": 120,
        "train_type": "High-Speed Rail"
    },
    {
        "route_id": "T004",
        "from": GBACities.SHENZHEN,
        "to": GBACities.GUANGZHOU,
        "terminal_from": Terminals.SZ_NORTH,
        "terminal_to": Terminals.GZ_SOUTH,
        "duration_minutes": 35,
        "price": 150,
        "train_type": "High-Speed Rail"
    },
    {
        "route_id": "T005",
        "from": GBACities.GUANGZHOU,
        "to": GBACities.FOSHAN,
        "terminal_from": Terminals.GZ_SOUTH,
        "terminal_to": "Foshan West Station",
        "duration_minutes": 20,
        "price": 45,
        "train_type": "High-Speed Rail"
    }
]

cathay_flights = [
    {
        "flight_number": "CX750",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "SIN",
            "city": "Singapore",
            "airport": "Changi Airport",
            "terminal": "Terminal 4"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 05m",
        "departure_time": "09:45",
        "arrival_time": "13:50",
        "carbon_emissions": "165kg CO2"
    },
    {
        "flight_number": "CX734",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "SIN",
            "city": "Singapore",
            "airport": "Changi Airport",
            "terminal": "Terminal 4"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 05m",
        "departure_time": "14:15",
        "arrival_time": "18:20",
        "carbon_emissions": "165kg CO2"
    },
    {
        "flight_number": "CX736",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "SIN",
            "city": "Singapore",
            "airport": "Changi Airport",
            "terminal": "Terminal 4"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 05m",
        "departure_time": "20:35",
        "arrival_time": "00:40",
        "carbon_emissions": "165kg CO2"
    }, 
    {
        "flight_number": "CX683",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "BKK",
            "city": "Bangkok",
            "airport": "Suvarnabhumi Airport",
            "terminal": "Terminal D"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "3h 05m",
        "departure_time": "15:30",
        "arrival_time": "18:35",
        "carbon_emissions": "145kg CO2"
    },
    {
        "flight_number": "CX617",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "BKK",
            "city": "Bangkok",
            "airport": "Suvarnabhumi Airport",
            "terminal": "Terminal D"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "3h 05m",
        "departure_time": "08:00",
        "arrival_time": "11:05",
        "carbon_emissions": "145kg CO2"
    },
    {
        "flight_number": "CX654",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "BKK",
            "city": "Bangkok",
            "airport": "Suvarnabhumi Airport",
            "terminal": "Terminal D"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "3h 05m",
        "departure_time": "20:45",
        "arrival_time": "23:50",
        "carbon_emissions": "145kg CO2"
    },
    {
        "flight_number": "CX500",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "NRT",
            "city": "Tokyo",
            "airport": "Narita International",
            "terminal": "Terminal 2"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 45m",
        "departure_time": "14:15",
        "arrival_time": "19:00",
        "carbon_emissions": "170kg CO2"
    },
    {
        "flight_number": "CX509",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "NRT",
            "city": "Tokyo",
            "airport": "Narita International",
            "terminal": "Terminal 2"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 45m",
        "departure_time": "09:30",
        "arrival_time": "14:15",
        "carbon_emissions": "170kg CO2"
    },
    {
        "flight_number": "CX521",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "NRT",
            "city": "Tokyo",
            "airport": "Narita International",
            "terminal": "Terminal 2"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "4h 45m",
        "departure_time": "18:45",
        "arrival_time": "23:30",
        "carbon_emissions": "170kg CO2"
    },
    {
        "flight_number": "CX731",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "TPE",
            "city": "Taipei",
            "airport": "Taoyuan International",
            "terminal": "Terminal 1"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "1h 55m",
        "departure_time": "11:55",
        "arrival_time": "13:50",
        "carbon_emissions": "95kg CO2"
    },
    {
        "flight_number": "CX467",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "TPE",
            "city": "Taipei",
            "airport": "Taoyuan International",
            "terminal": "Terminal 1"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "1h 55m",
        "departure_time": "07:30",
        "arrival_time": "09:25",
        "carbon_emissions": "95kg CO2"
    },
    {
        "flight_number": "CX474",
        "operator": "Cathay Pacific",
        "origin": {
            "code": "TPE",
            "city": "Taipei",
            "airport": "Taoyuan International",
            "terminal": "Terminal 1"
        },
        "destination": {
            "code": "HKG",
            "city": "Hong Kong",
            "airport": "Hong Kong Int'l (HKG)",
            "terminal": "Terminal 1"
        },
        "duration": "1h 55m",
        "departure_time": "15:40",
        "arrival_time": "17:35",
        "carbon_emissions": "95kg CO2"
    }
]

router = APIRouter()

# API Endpoints
@router.get("/ferry/routes")
async def get_ferry_routes():
    return {"routes": ferry_routes}

@router.get("/ferry/schedules/{route_id}")
async def get_ferry_schedules(route_id: str):
    route = next((r for r in ferry_routes if r["route_id"] == route_id), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    # Generate mock schedules for the next 24 hours
    current_time = datetime.now()
    schedules = []
    for i in range(8):  # 8 departures per day
        departure_time = current_time + timedelta(hours=i*3)
        schedules.append({
            "schedule_id": f"{route_id}-{i}",
            "departure_time": departure_time.strftime("%Y-%m-%d %H:%M"),
            "arrival_time": (departure_time + timedelta(minutes=route["duration_minutes"])).strftime("%Y-%m-%d %H:%M"),
            "available_seats": random.randint(0, 200),
            "price": route["price"]
        })
    return {"schedules": schedules}

@router.get("/bus/routes")
async def get_bus_routes():
    return {"routes": bus_routes}

@router.get("/bus/schedules/{route_id}")
async def get_bus_schedules(route_id: str):
    route = next((r for r in bus_routes if r["route_id"] == route_id), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    # Generate mock schedules
    schedules = []
    current_time = datetime.now()
    for i in range(12):  # 12 departures per day
        departure_time = current_time + timedelta(hours=i*2)
        schedules.append({
            "schedule_id": f"{route_id}-{i}",
            "departure_time": departure_time.strftime("%Y-%m-%d %H:%M"),
            "arrival_time": (departure_time + timedelta(minutes=route["duration_minutes"])).strftime("%Y-%m-%d %H:%M"),
            "available_seats": random.randint(0, 45),
            "price": route["price"]
        })
    return {"schedules": schedules}

@router.get("/train/routes")
async def get_train_routes():
    return {"routes": train_routes}

@router.get("/train/schedules/{route_id}")
async def get_train_schedules(route_id: str):
    route = next((r for r in train_routes if r["route_id"] == route_id), None)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    
    # Generate mock schedules
    schedules = []
    current_time = datetime.now()
    for i in range(10):  # 24 departures per day
        departure_time = current_time + timedelta(hours=i)
        schedules.append({
            "schedule_id": f"{route_id}-{i}",
            "departure_time": departure_time.strftime("%Y-%m-%d %H:%M"),
            "arrival_time": (departure_time + timedelta(minutes=route["duration_minutes"])).strftime("%Y-%m-%d %H:%M"),
            "available_seats": random.randint(0, 120),
            "price": route["price"]
        })
    return {"schedules": schedules}

@router.get("/flights/{origin}/{destination}")
async def get_route_summary(origin: str, destination: str):
    filtered_flights = [
        f for f in cathay_flights 
        if f["origin"]["code"].upper() == origin.upper() 
        and f["destination"]["code"].upper() == destination.upper()
    ]
    
    if not filtered_flights:
        raise HTTPException(status_code=404, detail="No flights found for this route")
    
    return filtered_flights