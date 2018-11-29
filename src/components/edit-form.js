import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { editUserSavedTeam, deleteUserSavedTeam } from '../actions/user';
import requiresLogin from '../requires-login';

class EditForm extends React.Component {
  onSubmit(e) {
    const editTeam ={
      name: e.target.buildName.value,
      team: this.props.currentTeam,
      notes: e.target.userNotes.value,
      id: this.props.teamId
    };
    console.log(editTeam);
    return this.props.dispatch(editUserSavedTeam(editTeam));
  }
  
  render() {
  const currentTeam = this.props.currentTeam.map((hero, index) => (
    <li className='hero-review' key={index}>
    <img className='hero-image-review' src={hero.image} alt={hero.heroName}></img>
    <p className='hero-name-review'>{hero.heroName}</p>
    <p className='hero-role-review'>{hero.role}</p>
  </li>
  ));

    let dmgSum = 0;
    if(this.props.currentTeam.length >0){
      for(let i = 0; i < this.props.currentTeam.length; i++){
        dmgSum += this.props.currentTeam[i].damage;
      }
    }
    
    let dpsSum = 0;
    if(this.props.currentTeam.length >0){
      for(let i = 0; i < this.props.currentTeam.length; i++){
        dpsSum += this.props.currentTeam[i].dps;
      }
    }

    let healthSum = 0;
    if(this.props.currentTeam.length >0){
      for(let i = 0; i < this.props.currentTeam.length; i++){
        healthSum += this.props.currentTeam[i].health;
      }
    }

    let hpsSum = 0;
    if(this.props.currentTeam.length >0){
      for(let i = 0; i < this.props.currentTeam.length; i++){
        hpsSum += this.props.currentTeam[i].hps;
      }  
    }

    const abilities = this.props.currentTeam.reduce((abilities, hero) => {
      return [...abilities, ...hero.abilities.map((ability, index) => <li key={hero.heroName + index} className='review-ability'>{ability}</li>)];
    }, []);

    const ultimates = this.props.currentTeam.map((hero, index) => (
      <li key={index} className='review-ult'>{hero.ultimate.ultName}</li>
    ));    
    

  
  return(
    <form className="review-build" onSubmit={(e)=> {
      e.preventDefault();
      this.onSubmit(e);
    }}>
      <section className="review-build">
        <section className='add-name'>
          <label htmlFor="buildName" className="buildName-label">Edit Your Build: {this.props.teamName}</label>
        </section>
        <section className='review-team-roster'>
          <ul className='review-team'>{currentTeam}</ul>
        </section> 
        <section className='other-lists'>
          <ul className='review-stats'>
            <li className='review-stat'>Damage: {dmgSum} </li>
            <li className='review-stat'>Damage Per Second: {dpsSum}</li>
            <li className='review-stat'>Health: {healthSum}</li>
            <li className='review-stat'>Healing Per Second: {hpsSum}</li>
          </ul>
          <section className='team-notes'>
            <label htmlFor='userNotes' className='notes-label'>Notes</label>
            <textarea name='userNotes' className='userNotes'></textarea>
          </section>
          <section className='review-abilities'>
            <h4>Abilities</h4>
            <ul className='review-abilities-list'>{abilities}</ul>
          </section>
          <section className='review-ultimates'>
            <h4>Ultimates</h4>
            <ul className='review-ult-list'>{ultimates}</ul>
          </section>
        </section> 
      </section>
      <Link to='/build' ><button>Edit Build</button></Link>
      <button>Save Build</button>
      <Link to='/dashboard'><button onClick={()=> this.props.dispatch(deleteUserSavedTeam(this.props.teamId))}>Delete Build</button></Link>
    </form>
  )
  }
}

function mapStateToProps(state){
  return{
    currentTeam: state.user.currentTeam,
    teamId: state.user.teamId
  }
}

export default requiresLogin()(connect(mapStateToProps)(EditForm));