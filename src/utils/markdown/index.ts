import marked from 'marked';
import highlight from 'highlight.js';

class MarkUtils {
    public constructor() {
        highlight.configure({ useBR: true });
        marked.setOptions({
            renderer: new marked.Renderer(),
            headerIds: false,
            gfm: true,
            // tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        });
        marked('');
    }

    public marked(data: string) {
        if (data) {
            return marked(data);
        } else {
            return '';
        }
    }
}

const markdown = new MarkUtils();

export default markdown;
