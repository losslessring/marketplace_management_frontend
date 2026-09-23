'use client'

import saveNodeData from '@/app/applications/[applicationId]/updateNodeData'
import { NodeData } from '@/app/interfaces/data/NodeData'
import { useNodeDataStore, useSelectedNodeStore } from '@/app/stores/node-store'
import { useEffect } from 'react'

export default function NodeEditor({
    applicationId,
}: {
    applicationId: number
}) {
    const {} = useSelectedNodeStore()
    const { addNodeData, updateNodeData } = useNodeDataStore()
    const selectedNodes = Array.from(useSelectedNodeStore.getState().ids)

    const lastSelectedNodeId = selectedNodes[selectedNodes.length - 1]

    const foundLastSelectedNodeData = useNodeDataStore
        .getState()
        .nodeData.find(
            (nodeData: NodeData) => nodeData.id === lastSelectedNodeId
        )
    // Data in a new nodes is not editable, possibly because of this code
    const lastSelectedNodeData = foundLastSelectedNodeData
        ? foundLastSelectedNodeData
        : { type: 'uninitialized', data: '' }

    useEffect(() => {
        if (
            selectedNodes.length > 0 &&
            lastSelectedNodeData.type === 'uninitialized'
        ) {
            addNodeData(lastSelectedNodeId, 'text', '')
        }
    })

    const dataTypes = ['text', 'json', 'number', 'code']

    return (
        <div className="node-editor bg-amber-700">
            Node Data <br />
            id: {lastSelectedNodeId}
            <br />
            <div>
                <label htmlFor="node_data_type">Data type:</label>
                <select
                    name="node_data_type"
                    id="node_data_type"
                    className={'select-node-data-type'}
                    value={lastSelectedNodeData.type}
                    onChange={(e) =>
                        updateNodeData(
                            lastSelectedNodeId,
                            e.target.value,
                            lastSelectedNodeData.data
                        )
                    }
                >
                    {dataTypes.map((dataType) => (
                        <option value={dataType} key={dataType}>
                            {dataType}
                        </option>
                    ))}
                </select>
            </div>
            data:
            <textarea
                className="text-area"
                name="node_data"
                rows={5}
                value={lastSelectedNodeData.data}
                onChange={(e) =>
                    updateNodeData(
                        lastSelectedNodeId,
                        lastSelectedNodeData.type,
                        e.target.value
                    )
                }
            ></textarea>
            <button
                onClick={async () => {
                    const actualNodeData = useNodeDataStore
                        .getState()
                        .nodeData.find(
                            (nodeData: NodeData) =>
                                nodeData.id === lastSelectedNodeId
                        )
                    if (actualNodeData) {
                        const result = await saveNodeData(applicationId, {
                            nodeDataType: actualNodeData.type,
                            nodeData: actualNodeData.data,
                            nodeId: actualNodeData.id,
                        })
                        console.log(result)
                    }
                }}
            >
                Save
            </button>
        </div>
    )
}
