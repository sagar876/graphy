import React, { useState } from "react";
import Card from "../components/card";
import Dropzone from "../components/dropzone";
import List from "../components/list";
import { data, statuses } from "../payload";
const Dashboard = () => {
    const initialLists = window.localStorage.getItem('lists') ? JSON.parse(window.localStorage.getItem('lists')) : statuses;
    console.log(JSON.stringify(window.localStorage.getItem('lists')))
    const [items, setItems] = useState(data);
    const [lists, setLists] = useState(initialLists);
    const onDrop = (item, monitor, status) => {
        const mapping = lists.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

    const addList = () => {
        const newListItem = {
            status: "open",
            id:(parseInt(lists[lists.length-1]?.id)),
            icon:"sd",
            color: "#3981DE"
        }
        const newItems = window.localStorage.getItem('lists') ? JSON.parse(window.localStorage.getItem('lists')) : [...items];
        newItems.push(newListItem)
        window.localStorage.setItem('lists',JSON.stringify(newItems));
        setLists(newItems);
    }
    return (
        <div className={"row"}>
            <div>
                <button onClick={addList}>Add a List</button>
            </div>
            {lists.map(s => {
                return (
                    <div className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <Dropzone onDrop={onDrop} status={s.status}>
                        <List>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Card key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </List>
                        </Dropzone>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard;