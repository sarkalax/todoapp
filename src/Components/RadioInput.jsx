import "./RadioInput.css";

export function RadioInput({value, setSelectedList}) {
    return (
        <>
            <input
                type="radio"
                id={value}
                value={value}
                name="radioButt"
                onChange={(e) => setSelectedList(e.target.value)}
            />
            <label htmlFor={value}>{value}</label>
        </>
    );
}
