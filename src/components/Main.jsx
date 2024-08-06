import "./Main.css";
import ReactMarkdown from 'react-markdown';

const Main = ({ activeNote ,  onUpdateNote}) => {
  const onEditNote = (key , value) => {
    onUpdateNote({
      // スプレ構文で最新を複製
      ...activeNote,
      // 動的にしている
      [key] : value,
      modDate: Date.now() 
    });
  }


  if(!activeNote){
    return <div className='noactivenote'>ノートが選択されていません</div>
  }

  return (
    <div className='app-main'>
      <div className='app-main-note-edit'>
        <input id="title" 
                type='text'
                value={activeNote.title}
                //文字を打ち込むごとにこのonEditが発火する
                // この引数を単にvalueとしないのは動的にonUpdateNoteを更新したいため
                onChange={(e) => onEditNote("title" , e.target.value)}
        ></input>
        <textarea id="content"
                  placeholder='ノートを記入'
                  value={activeNote.content}
                  onChange={(e) => onEditNote("content" , e.target.value)}>
        </textarea>
      </div>
      <div className='app-main-note-pre'>
        <h1 className='pre-title'>{activeNote.title}</h1>
        <ReactMarkdown className='markdown-pre'>{activeNote.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default Main