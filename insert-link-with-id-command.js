import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertLinkWithIdCommand extends Command {
    execute(options) {
        const { text, href, id } = options || { text: '', href: '', id: '' };
        const editor = this.editor;

        if (!id) {
            return;
        }

        editor.model.change(writer => {
            const selection = editor.model.document.selection;
            const position = selection.getFirstPosition();

            const attributes = new Map();
            attributes.set('linkHref', href);

            editor.model.insertContent(
                writer.createText(text, attributes),
                position
            );

            const link = editor.model
                .document
                .selection
                .getFirstPosition()
                .findAncestor('paragraph');

            if (link) {
                writer.setAttribute('id', id, link);
            }
        });
    }
}
