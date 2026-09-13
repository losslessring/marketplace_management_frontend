export default function NodeDataSelectList({
    currentDataType,
}: {
    currentDataType: string
}) {
    const dataTypes = ['text', 'json', 'number', 'code']

    return (
        <div>
            <label htmlFor="node_data_type">Data type:</label>
            <select
                defaultValue={currentDataType}
                name="node_data_type"
                id="node_data_type"
                className={'select-node-data-type'}
                value={currentDataType}
            >
                {dataTypes.map((dataType) => (
                    <option value={dataType}>{dataType}</option>
                ))}
            </select>
        </div>
    )
}
