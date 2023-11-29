import Command from "@ckeditor/ckeditor5-core/src/command";

export default class RemoveLinkWithIdCommand extends Command {
    execute(options) {
        const { id } = options || { id: '' };
        const editor = this.editor;

        if (!id) {
            return
        }

        editor.model.change(writer => {
            const range = writer.createRangeIn( editor.model.document.getRoot() );

            for (const value of range.getWalker()) {
                if ( value.item.is('element', 'paragraph') && value.item.getAttribute('id') === id) {
                    writer.remove(value.item);
                    editor.execute('enter');
                }
            }
        });
    }
}
