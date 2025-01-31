import React from 'react'
import "./Sidebar.css";

const Sidebar = ( { onAddNote , notes , deleteNote , setActiveNote , activeNote} ) => {

  const sorteNotes = notes.sort((a , b) => b.modDate - a.modDate);

  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className='app-sidebar-notes'>
        {sorteNotes.map((note) => (
          <div className={`app-sidebar-note ${note.id === activeNote && "active"}`} key={note.id} 
          onClick={() => setActiveNote(note.id)}>
            <div className='app-sidebar-note-title'>
              <strong>{note.title}</strong>
              <button onClick={() => deleteNote(note.id)}>削除</button>
            </div>
            <p>{note.content}</p>
            <small>{new Date(note.modDate).toLocaleDateString("ja-JP" , 
              {hour: "2-digit",
                minute : "2-digit"
              })}</small>
          </div>
        ))}
        <div className='app-sidebar-note'>
          <div className='app-sidebar-note-title'>
            <strong>タイトル</strong>
            <button>削除</button>
          </div>
          <p>ノートの内容です</p>
          <small>最後の修正日:xx/xxx</small>
        </div>
      </div>
    </div>
  );
}

export default Sidebar