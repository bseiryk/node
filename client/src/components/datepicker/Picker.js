import React from 'react'

const Picker = (props) => {
  const {
    showSingleIcons,
    handleDoublePrevClick = () => { },
    handleDoubleNextClick = () => { },
    handlePrevClick = () => { },
    handleNextClick = () => { },
    renderHeaderContent = () => { },
    renderMainContent = () => { },
    renderRightContent = () => { },
  } = props;
  return (
    <div className='picker-container'>
      <div>
        <div>
          <div className='header-container'>
            <div className='icon-wrapper'>
              <span
                onClick={handleDoublePrevClick}
                className='double-prev-icon'
              />
              {showSingleIcons && (
                <span
                  onClick={handlePrevClick}
                  className='prev-icon'
                />
              )}
            </div>
            {renderHeaderContent()}
            <div className='icon-wrapper'>
              {showSingleIcons && (
                <span
                  onClick={handleNextClick}
                  className='next-icon'
                />
              )}
              <span
                onClick={handleDoubleNextClick}
                className='double-next-icon'
              />
            </div>
          </div>
          <div className='main-container'>
            {renderMainContent()}
          </div>
        </div>
        {renderRightContent()}
      </div>
      <div className='footer-container'>
        <div className='default-footer'>
          <button>
            Today
        </button>
        </div>
      </div>
    </div>
  )
}

export default Picker
