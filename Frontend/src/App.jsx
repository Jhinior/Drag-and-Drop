import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import DragAndDrop from './components/DragAndDrop'



function App() {
 
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <div className="App" >
          <DragAndDrop/>
      </div>
    </DndProvider>
      
    </>
  )
}

export default App
