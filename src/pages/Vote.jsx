import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import VoteForm from '../forms/VoteForm';


function Vote() {
    return (
        <DndProvider backend={HTML5Backend}>
            <VoteForm />
        </DndProvider>
    )
}

export default Vote