from sqlmodel import Session, select, SQLModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database import engine, create_db_and_tables
from models import Project


# sql_file_name = "database.db"
# sqlite_url = f"sqlite:///{sql_file_name}"

# connect_args = {"check_same_thread": False}

# engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    # create_users()
    yield


app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)


@app.get("/")
async def read_root():
    project = Project(name="Test", date="2025", cost=50)

    with Session(engine) as session:
        session.add(project)
        session.commit()
        session.refresh(project)
    return {"message": "Hello, World!"}


@app.get("/projects/")
def read_projects():
    with Session(engine) as session:
        projects = session.exec(select(Project)).all()
        return projects


@app.get("/projects/by_name/{name}")
def read_project_name(name: str):
    with Session(engine) as session:

        project = session.exec(select(Project).where(Project.name == name)).first()
        return project


@app.get("/projects/by_id/{id}")
def read_project_id(id: int):
    with Session(engine) as session:
        statement = select(Project).where(Project.id == id)
        # project = session.get(Project, id)
        project = session.exec(statement).first()
        print(f"Query ID: {id}")  # Debug: Print the ID being queried
        print(f"Query Result: {project}")
        if project is None:
            raise HTTPException(
                status_code=404, detail=f"Project with id {id} not found"
            )

        return project


@app.patch("/projects/by_id/{id}")
def update_project_id(id: int, project: Project):
    with Session(engine) as session:
        db_project = session.get(Project, id)
        if not db_project:
            raise HTTPException(status_code=404, detail="Project not found")
        project_data = project.model_dump(exclude_unset=True)
        db_project.sqlmodel_update(project_data)
        session.add(db_project)
        session.commit()
        session.refresh(db_project)


@app.delete("/projects/by_id/{id}")
def delete_project(id: int):
    with Session(engine) as session:
        project = session.get(Project, id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        session.delete(project)
        session.commit()
        return {"message": "Project deleted successfully"}


@app.post("/projects/")
def create_project(project: Project):
    new_project = Project(name=project.name, cost=project.cost, date=project.date)
    with Session(engine) as session:
        session.add(new_project)
        session.commit()
        session.refresh(new_project)


def create_users():
    project_1 = Project(name="David", date="asas", cost=20)

    with Session(engine) as session:
        session.add(project_1)

        session.commit()


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def main():
    create_db_and_tables()
    create_users()


if __name__ == "__main__":
    main()
