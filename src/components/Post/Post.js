import React, { Component } from 'react';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import ReplyIcon from 'react-icons/lib/md/chat-bubble-outline';
import FavoriteIcon from 'react-icons/lib/md/favorite-outline';
import MessageIcon from 'react-icons/lib/md/mail-outline';
import MasterControlIcon from 'react-icons/lib/md/more-vert';

import './Post.css';

import Edit from './Edit/Edit';

//////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT////////////////////

export default class Post extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      showMasterMenu: false
    }
  }

  // This puts the post into EDIT mode when the EDIT button is clicked from the drop-down
  showEdit = () => {
    this.setState({ editing: true, showMasterMenu: false });
  }

  // This puts the post back into normal viewing mode when the CANCEL button is clicked
  // This method is passed down to the <Edit /> component via props
  hideEdit = () => {
    this.setState({ editing: false });
  }

  // This toggles the drop-down when the three dots in the top right corner of a post are clicked
  toggleMasterMenu = () => {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }

  // This hides the drop-down when the post is clicked anywhere
  hideMasterMenu = () => {
    if (this.state.showMasterMenu === true) {
      this.setState({ showMasterMenu: false });
    }
  }

  render() {
    // This is destructuring! You can also think of it as being written as so:
    // const editing = this.state.editing
    // const showMasterMenu = this.state.showMasterMenu
    const { editing, showMasterMenu } = this.state;
    const { text, date } = this.props;
    const { id, deletePostFn, updatePostFn } = this.props
    // console.log(this.props) // 

    return (
      // Main body of post
      <section className="Post__parent" onClick={this.hideMasterMenu}>

        {/* Three dots in top right corner */}
        <div className="Post__master-controls">
          <MasterControlIcon onClick={this.toggleMasterMenu} />

          {/* Drop-down menu. Remember that the "showMasterMenu" variable has been destructured off of this.state */}
          <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
            <span onClick={ this.showEdit }>Edit</span>
            <span onClick={ () => deletePostFn( id ) }>Delete</span> { /* Remember to destructure deletePostFn off of props or use this.props.deletePostFn */ }
          </div>
        </div>

        {/* This is where all the meta data of the post will go (who, when, where) */}
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <ProfileIcon />
          </div>

          <span className="Post__name">DevMountain</span>
          <span className="Post__handle">@DevMountain</span>

          <span className="Post__date">- {date}</span>
        </div>
        <div className="Post__content">
        {
          editing
          ? <Edit text={ text }
              id={ id } 
              hideEdit={ this.hideEdit }
              updatePostFn={ updatePostFn } />
          : <span className="Post__text">{ text }</span>
        }
        </div>

        {/* These are all of the cute little icons in the bottom left corner */}
        <div className="Post__user-controls">
          <ReplyIcon className="Post__control-icon" />
          <FavoriteIcon className="Post__control-icon" />
          <MessageIcon className="Post__control-icon" />
        </div>

      </section>
    )
  }
}