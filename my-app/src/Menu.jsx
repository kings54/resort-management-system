import React from 'react';

const Menu = ({
  menuTypes, menuType, setMenuType, allTags, activeTag, setActiveTag, filteredMenu, addToOrder, feedback, handleFeedbackChange, handleFeedbackSubmit, feedbackMsg, menuSearch, setMenuSearch
}) => (
  <section id="menu-section" className="menu-section container">
    <h2>Menu</h2>
    <div className="menu-filters">
      {menuTypes.map(type => (
        <button
          key={type}
          className={menuType === type ? 'active' : ''}
          onClick={() => setMenuType(type)}
        >
          {type}
        </button>
      ))}
    </div>
    <div style={{ margin: '20px 0' }}>
      {allTags.map(tag => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          style={{
            marginRight: 8,
            marginBottom: 8,
            background: activeTag === tag ? '#e67e22' : '#fff',
            color: activeTag === tag ? '#fff' : '#e67e22',
            border: '2px solid #e67e22',
            borderRadius: 4,
            padding: '6px 16px',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
        >
          {tag}
        </button>
      ))}
      {activeTag && (
        <button
          onClick={() => setActiveTag('')}
          style={{
            marginLeft: 8,
            background: '#888',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '6px 16px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Clear Tag
        </button>
      )}
    </div>
    <div className="menu-grid">
      {filteredMenu.map(item => (
        <div key={item.id} className="menu-item">
          <img src={item.image} alt={item.name} className="menu-item-image" />
          <div className="menu-item-content">
            <h3>{item.name}</h3>
            <span className="price">{item.price}</span>
            <p>{item.description}</p>
            {item.tags && (
              <div style={{ margin: '10px 0' }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-block',
                      background: '#eee',
                      color: '#888',
                      borderRadius: 4,
                      padding: '2px 8px',
                      marginRight: 6,
                      fontSize: '0.95em'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button className="add-order" onClick={() => addToOrder(item)}>Add to Order</button>
            <div className="dish-feedback">
              <input
                type="text"
                placeholder="Leave feedback"
                value={feedback[item.id] || ''}
                onChange={e => handleFeedbackChange(item.id, e.target.value)}
              />
              <button
                className="feedback-btn"
                disabled={!feedback[item.id]}
                onClick={() => handleFeedbackSubmit(item.id)}
              >Send</button>
            </div>
            {feedbackMsg && <span className="form-msg">{feedbackMsg}</span>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Menu; 