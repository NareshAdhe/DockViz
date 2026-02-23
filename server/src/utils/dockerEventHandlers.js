export const handleContainerEvent = (event,io) => {
    const container = event.Actor;
    if(event.Action === 'start'){
        io.emit('container_state_change',{id: container.ID, state: "running"});
    }
    else if(event.Action === 'die' || event.Action === 'stop'){
        io.emit('container_state_change',{id: container.ID, state: "exited"});
    }
    else if(event.Action === 'pause'){
        io.emit('container_state_change',{id: container.ID, state: "paused"});
    }
}

export const handleImageEvent = (event,io) => {

}

export const handleVolumeEvent = (event,io) => {

}

export const handleNetworkEvent = (event,io) => {

}