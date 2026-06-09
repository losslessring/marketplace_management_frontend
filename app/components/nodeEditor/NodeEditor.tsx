import GraphEditor from './GraphEditor'
import NodeLibrary from './NodeLibrary'

export default function NodeEditor() {
    return (
        // <div className="grid grid-rows-[auto_1fr] min-h-screen md:grid-cols-[auto_1fr]">
        <div className="grid grid-cols-1 grid-rows-[1fr_6fr] md:grid-rows-[1fr] md:grid-cols-[1fr_6fr] h-[84vh]">
            <NodeLibrary></NodeLibrary>
            <GraphEditor></GraphEditor>
        </div>
    )
}
