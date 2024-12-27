import React from "react";
import TaskList from "../components/TaskList";

const Dashboard: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>TaskFlow Dashboard</h1>
            <TaskList />
        </div>
    );
};

export default Dashboard;