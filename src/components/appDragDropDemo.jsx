import React, {Component} from 'react';
import '../App.css'

class AppDragDropDemo extends Component {

    state = {
        tasks: [
            {id: 1, name: "Learn React", category: 'wip', bgcolor: "Blue"},
            {id: 2, name: "Learn Node", category: 'complete', bgcolor: "Red"},
            {id: 3, name: "Learn Angular", category: 'wip', bgcolor: "Green"},
            {id: 4, name: "Learn ASP.net", category: 'wip', bgcolor: "Yellow"},
        ]
            };

    onDragOver = (e) => {
        e.preventDefault();
    };
    onDragStart = (e, task) => {
        e.dataTransfer.setData("taskId", task);
    };
    onDrop = (e, complete) => {
        let task = e.dataTransfer.getData("taskId");
        let {tasks} = this.state;
        let updatedTasks = tasks.filter((t)=>{
            if (t.id == task) {
                console.log ('id',t.id);
                t.category = complete;
            }
            return t;
        });
        this.setState({...this.state, tasks: updatedTasks});
    };
    render() {
        let tasks = {
            wip: [],
            complete: []
        };

        {this.state.tasks.forEach(task => {
            tasks[task.category].push(
                <div key={task.id}
                     onDragStart = {(e)=>this.onDragStart(e, task.id)}
                     draggable
                className="draggable"
                style={{backgroundColor: task.bgcolor}}
                >{task.name}</div>
            )
        })};

        return (
            <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="wip">
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div className="droppable"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>this.onDrop(e, "complete")}
                >
                    <span className="task-header">Completed</span>
                    {tasks.complete}
                </div>
            </div>
        );
    }
}


export default AppDragDropDemo;
