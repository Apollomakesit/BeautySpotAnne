from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from . import models


SERVICE_CATALOG: list[dict[str, Any]] = [
    {
        "name": "1D",
        "description": "Extensii clasice 1D cu efect curat si natural, aplicate fir cu fir.",
        "duration_minutes": 90,
        "price": 130.0,
        "image_url": "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "1&2D",
        "description": "Mix intre stilul 1D si 2D pentru un rezultat natural cu volum discret.",
        "duration_minutes": 100,
        "price": 140.0,
        "image_url": "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "2D",
        "description": "Volum 2D echilibrat, ideal pentru densitate vizibila si aspect elegant.",
        "duration_minutes": 100,
        "price": 150.0,
        "image_url": "https://images.unsplash.com/photo-1512310604669-443f26c35f52?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "2&3D",
        "description": "Combinatie 2D si 3D pentru un volum mediu, potrivit pentru look de zi si seara.",
        "duration_minutes": 110,
        "price": 160.0,
        "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "3D",
        "description": "Volum 3D bine definit, cu efect glam si pastrare a confortului.",
        "duration_minutes": 120,
        "price": 170.0,
        "image_url": "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "3&4D",
        "description": "Mix 3D si 4D pentru intensitate mai mare si efect bogat, dar rafinat.",
        "duration_minutes": 120,
        "price": 180.0,
        "image_url": "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "4D",
        "description": "Volum 4D intens, pentru un efect dramatic si ochi foarte expresivi.",
        "duration_minutes": 130,
        "price": 200.0,
        "image_url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Whispy volume",
        "description": "Stil Whispy cu varfuri texturate si efect airy modern.",
        "duration_minutes": 150,
        "price": 270.0,
        "image_url": "https://images.unsplash.com/photo-1588514912908-8e32e4b43b1c?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Russian volume",
        "description": "Tehnica Russian volume pentru gene pufoase, uniforme si de impact.",
        "duration_minutes": 140,
        "price": 250.0,
        "image_url": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Mega volume",
        "description": "Mega volume cu densitate maxima pentru un look statement.",
        "duration_minutes": 150,
        "price": 280.0,
        "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Combi NC",
        "description": "Tehnica Combi NC pentru definitie, directie controlata si finisaj profesional.",
        "duration_minutes": 130,
        "price": 230.0,
        "image_url": "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Foxy eyeliner",
        "description": "Efect Foxy eyeliner care alungeste optic privirea si accentueaza coltul extern.",
        "duration_minutes": 140,
        "price": 250.0,
        "image_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Pensat",
        "description": "Pensat profesional pentru contur curat si simetrie naturala a sprancenelor.",
        "duration_minutes": 15,
        "price": 30.0,
        "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=1200&h=800&q=80",
    },
    {
        "name": "Stilizat sprancene",
        "description": "Stilizare completa a sprancenelor pentru forma personalizata si aspect ingrijit.",
        "duration_minutes": 30,
        "price": 60.0,
        "image_url": "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&w=1200&h=800&q=80",
    },
]


def normalize_service_name(name: str) -> str:
    return " ".join(name.strip().lower().split())


SERVICE_ALIASES = {
    "1d classic": "1d",
    "1&2d mix": "1&2d",
    "2d volume": "2d",
    "2&3d mix": "2&3d",
    "3d volume": "3d",
    "3&4d mix": "3&4d",
    "4d volume": "4d",
}


def resolve_catalog_key(name: str) -> str:
    normalized = normalize_service_name(name)
    return SERVICE_ALIASES.get(normalized, normalized)


SERVICE_ORDER = {
    resolve_catalog_key(service["name"]): index
    for index, service in enumerate(SERVICE_CATALOG)
}
CATALOG_NAME_SET = set(SERVICE_ORDER.keys())


def sync_service_catalog(db: Session) -> list[models.Service]:
    """Keep DB services in sync with the fixed BeautySpot catalog."""
    existing_services = db.query(models.Service).order_by(models.Service.id.asc()).all()

    grouped_services: dict[str, list[models.Service]] = {}
    for db_service in existing_services:
        key = resolve_catalog_key(db_service.name)
        grouped_services.setdefault(key, []).append(db_service)

    canonical_ids: set[int] = set()

    for catalog_service in SERVICE_CATALOG:
        key = resolve_catalog_key(str(catalog_service["name"]))
        candidates = grouped_services.get(key, [])
        current = candidates[0] if candidates else None

        if current is None:
            current = models.Service(
                name=str(catalog_service["name"]),
                description=str(catalog_service["description"]),
                duration_minutes=int(catalog_service["duration_minutes"]),
                price=float(catalog_service["price"]),
                deposit_amount=round(float(catalog_service["price"]) * 0.5, 2),
                image_url=str(catalog_service["image_url"]),
                active=True,
            )
            db.add(current)
            db.flush()
        else:
            current.name = str(catalog_service["name"])
            current.description = str(catalog_service["description"])
            current.duration_minutes = int(catalog_service["duration_minutes"])
            current.price = float(catalog_service["price"])
            current.deposit_amount = round(float(catalog_service["price"]) * 0.5, 2)
            current.image_url = str(catalog_service["image_url"])
            current.active = True

        canonical_ids.add(current.id)

    for db_service in existing_services:
        key = resolve_catalog_key(db_service.name)
        if key not in CATALOG_NAME_SET or db_service.id not in canonical_ids:
            db_service.active = False

    db.commit()

    services = db.query(models.Service).filter(models.Service.active == True).all()
    services.sort(key=lambda item: SERVICE_ORDER.get(resolve_catalog_key(item.name), 999))
    return services
