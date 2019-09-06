import { InputModule } from 'macoolka-type-model'
export const fileStore: InputModule.MModule = {
    name: 'FileStore',
    interfaces: [{
        name: 'Container',
        fields: [{
            name: 'name',
            exclusiveWhere: true,
            id: true,
        }, {
            name: 'option',
            type: {
                _kind: 'json'
            },
            exclusiveLoad: true,
            exclusiveSearch: true,
            exclusiveWhere: true,
            exclusiveUpdate: true,
        }]
    }, {
        name: 'File',
        fields: [{
            name: 'name',
            id: true,
        }, {
            name: 'container',
            id: true,

        }, {
            name: 'folders',
            type: {
                _kind: 'string',
                isArray: true,
            },
            id: true,
        }, {
            name: 'data',
            type: {
                _kind: 'typeUnion',
                values: ["Stream", "string", "Buffer",],

            },
            required: true,
            exclusiveSearch: true,
            exclusiveWhere: true,
            exclusiveLoad: true,
        }, {
            name: 'encoding',
            exclusiveSearch: true,
            exclusiveWhere: true,
            exclusiveLoad: true,
        }, {
            name: 'size',
            type: 'number',
            required: true,
            readonly: true,
        }, {
            name: 'lastModified',
            type: 'datetime',
            required: true,
            readonly: true,
        }]
    }]

}
export default fileStore