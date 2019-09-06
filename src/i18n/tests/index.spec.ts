import { buildI18N } from '../'
describe('i18n', () => {
    it('', () => {
        expect(buildI18N({ id: 'macoolka.fs.folderNotExist', value: { name: 'name', container: 'C' } })({}))
            .toEqual('Folder name not exist in container C.')
        expect(buildI18N({ id: 'macoolka.fs.folderNotExist', value: { name: 'name', container: 'C' } })({ i18n:{locale: 'zh' }}))
        .toEqual('在容器C中不存在文件夹name.')
    })

})