import "./AddForm.css";
import { useState, useEffect } from "react";

import { FaCheck } from "react-icons/fa6";

import { TaskList } from "./TaskList";
import { RadioInput } from "./RadioInput";

export function AddForm() {
    const [nameOfTask, setNameOfTask] = useState("");
    const [tasks, setTasks] = useState(() => {
        const localValue = localStorage.getItem("TASKS");
        if (localValue === null) return [];
        return JSON.parse(localValue);
    });
    const [selectedList, setSelectedList] = useState("");

    const [homeTasks, setHomeTasks] = useState([]);
    const [workTasks, setWorkTasks] = useState([]);
    const [schoolTasks, setSchoolTasks] = useState([]);
    const [otherTasks, setOtherTasks] = useState([]);

    function addTask(nameOfTask, selectedList) {
        if (nameOfTask === "") return;

        setTasks((tasks) => [
            ...tasks,
            {
                title: nameOfTask,
                id: crypto.randomUUID(),
                checked: false,
                type: selectedList,
            },
        ]);

        setNameOfTask("");
    }

    function deleteTask(parId) {
        setTasks((tasks) => tasks.filter((task) => task.id !== parId));
    }

    useEffect(() => {
        localStorage.setItem("TASKS", JSON.stringify(tasks));

        setHomeTasks((homeTasks) =>
            tasks.filter((task) => task.type === "home")
        );
        setWorkTasks((workTasks) =>
            tasks.filter((task) => task.type === "work")
        );
        setSchoolTasks((schoolTasks) =>
            tasks.filter((task) => task.type === "school")
        );
        setOtherTasks((otherTasks) =>
            tasks.filter((task) => task.type === "other")
        );
    }, [tasks]);

    return (
        <>
            <section className="lists">
                <section className="taskForm glassEffect">
                    <form
                        autoComplete="off"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h2>To Do App</h2>
                        <div className="searchDiv">
                            <input
                                type="text"
                                name="inputText"
                                value={nameOfTask}
                                onChange={(e) => setNameOfTask(e.target.value)}
                            />
                            <button
                                className="defaultBttn"
                                onClick={() =>
                                    addTask(nameOfTask, selectedList)
                                }
                            >
                                Add
                            </button>
                        </div>
                        <div className="radioSection">
                            <RadioInput
                                value={"work"}
                                setSelectedList={setSelectedList}
                            />
                            <RadioInput
                                value={"home"}
                                setSelectedList={setSelectedList}
                            />
                            <RadioInput
                                value={"school"}
                                setSelectedList={setSelectedList}
                            />
                            <RadioInput
                                value={"other"}
                                setSelectedList={setSelectedList}
                            />
                            <RadioInput 
                                value={"none"}
                                setSelectedList={setSelectedList}
                            />
                        </div>
                    </form>
                    <section className="allTasks">
                        <TaskList
                            tasks={tasks}
                            deleteTask={deleteTask}
                            headerTitle={"All"}
                        />
                    </section>
                    <button
                        className="defaultBttn deleteAllBttn"
                        onClick={() => setTasks([])}
                    >
                        Delete All
                    </button>
                </section>

                <TaskList
                    tasks={workTasks}
                    deleteTask={deleteTask}
                    headerTitle={"Work List"}
                />
                <TaskList
                    tasks={homeTasks}
                    deleteTask={deleteTask}
                    headerTitle={"Home List"}
                />
                <TaskList
                    tasks={schoolTasks}
                    deleteTask={deleteTask}
                    headerTitle={"School List"}
                />
                <TaskList
                    tasks={otherTasks}
                    deleteTask={deleteTask}
                    headerTitle={"Other List"}
                />
            </section>
        </>
    );
}
