import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';;
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg'
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';
import View from '@ckeditor/ckeditor5-ui/src/view';
import Template from '@ckeditor/ckeditor5-ui/src/template';
import TextAlternativeFormView from '@ckeditor/ckeditor5-image/src/imagetextalternative/ui/textalternativeformview';

import linkIcon from '@ckeditor/ckeditor5-link/theme/icons/link.svg';

class TestView extends View {
    constructor(locale) {
        super(locale);

        this.setTemplate({
            tag: 'p',
            children:[
                'A paragraph'
            ]
        });
    }
}

export default class TestPlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ContextualBalloon ];
    }

    init() {
        const editor = this.editor;
        
        this.testView = new TestView(editor.locale);

        this._balloon = editor.plugins.get( ContextualBalloon );
        
        editor.ui.componentFactory.add( 'test', locale => {
			const button = new ButtonView( locale );

			button.isEnabled = true;
			button.label = 'TEsT';
			button.icon = linkIcon;
			button.tooltip = true;

			// Show the panel on button click.
			this.listenTo( button, 'execute', () => {
                console.log("The test button has been executed!")
                this._balloon.add( {
                    view: this.testView
                } );

            } );

			return button;
		} );
    }
}


ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Essentials, Paragraph, Bold, Italic, Image, ImageCaption, LinkPlugin, TestPlugin],
        toolbar: ['bold', 'italic', 'link', 'test']
    })
    .then(editor => {
        console.log('Editor was initialized', editor);
        // const test = new TestView(editor.locale);
        // test.render();
        // editor.
    })
    .catch(error => {
        console.error(error.stack);
    });
