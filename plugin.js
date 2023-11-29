import { Plugin } from '@ckeditor/ckeditor5-core';
import InsertLinkWithIdCommand from "./insert-link-with-id-command";
import RemoveLinkWithIdCommand from "./remove-link-with-id-command";

export const ATTRIBUTE_ID = 'id';

export default class AddIdAttributeToHrefPlugin extends Plugin {
    static get pluginName() {
        return 'AddIdAttributeToHrefPlugin';
    }

    init() {
        const editor = this.editor;
        const model = editor.model;

        model.schema.extend( 'paragraph', { allowAttributes: [ ATTRIBUTE_ID ] } );
        editor.commands.add('insertLinkWithId', new InsertLinkWithIdCommand(editor));
        editor.commands.add('removeLinkWithId', new RemoveLinkWithIdCommand(editor));

        const conversionConfig = { model: 'id', view: 'id' };
        editor.conversion.for('downcast').attributeToAttribute(conversionConfig);
        editor.conversion.for( 'upcast' ).attributeToAttribute(conversionConfig);
    }
}
