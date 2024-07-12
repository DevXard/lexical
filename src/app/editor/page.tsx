"use client";

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import ToolbarPlugin from '@/app/_components/ToolbarPlugin';
import theme from '@/utls/theme';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { SetStateAction, useEffect, useState } from 'react';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function MyOnChangePlugin({ onChange }: { onChange: (editorState: unknown) => void }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

function Editor() {
  const editorConfig = {
    namespace: 'React.js Demo',
    nodes: [],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
    // The editor theme
    theme,
  };
  const [editorState, setEditorState] = useState();
console.log("editorState", editorState);
  function onChange(e: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setEditorState(e);
  }
  return (
    <div className='w-1/2 border-red-500'>
   <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin onChange={onChange}/>

        </div>
      </div>
    </LexicalComposer>
    </div>
  );
}

export default Editor;