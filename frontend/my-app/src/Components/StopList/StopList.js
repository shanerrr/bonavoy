import React from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import StopListItem from '../StopListItem/StopListItem';
import './style.css';

const itemDraggingStyle = {
	backgroundColor:'#C4DDE9',
	borderColor:'transparent',
}

const itemStyle = {
	backgroundColor:'white',
}

const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? '#afafaf' : '#d6d6d6',
})
class StopList extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		// dropped outside the list
		if(!result.destination){
			return;
		}
		this.props.reorderStops(result.source.index, result.destination.index);
	}

	render(){		
		return(
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div 
							{...provided.droppableProps}
							ref={provided.innerRef}
							className="stop-list"
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{this.props.stops.map((stop, key) => (
								<Draggable key={stop.id} draggableId={stop.id} index={key}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}	
										>
											<StopListItem
												stop={stop}	
												index={key}
												style={snapshot.isDragging ? itemDraggingStyle : itemStyle}
												removeStop={this.props.removeStop}
												className="stop-list-item"
											/>
										</div>
									)}
								</Draggable>
							))}	
							{provided.placeholder}
						</div>
					)}					
				</Droppable>
			</DragDropContext>
		)
	}

}

export default StopList;
