import { FaCheck } from "react-icons/fa6";
import "./TaskList.css";

export function TaskList( {tasks, deleteTask, headerTitle} ) {
    return (
        <div className="list glassEffect">
            <h3>{headerTitle}</h3>
            <ul>
                {tasks.map((task) => {
                    const { title, id } = task;
                    return (
                        <li key={id} onClick={() => deleteTask(id)}>
                            {title}
                            <button
                                className="checkIcon"
                            >
                                <FaCheck />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
