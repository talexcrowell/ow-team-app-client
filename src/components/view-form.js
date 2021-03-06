import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteUserSavedTeam } from '../actions/user';
import requiresLogin from '../requires-login';
import'./view-form.css';

export class ViewForm extends React.Component {
  render() {
    //Returns the images/data of heroes within a specific roster
    const currentTeam = this.props.currentTeam.map((hero, index) => (
      <li className='hero-review' key={index}>
      <div class="review-flip-card">
        <div class="review-flip-card-inner">
          <div class="review-flip-card-front">
            <img className='hero-image-review' src={hero.image} alt={hero.heroName}></img>
            <p className='hero-name-review'>{hero.heroName}</p>
            <p className='hero-role-review'>{hero.role}</p>
          </div>
          <div class="review-flip-card-back">
            <label className='review-flip-label'>Damage</label>
            <p className='hero-role-review'>{hero.damage}</p>
            <label className='review-flip-label'>DPS</label>
            <p className='hero-role-review'>{hero.dps}</p>
            <label className='review-flip-label'>Health</label>
            <p className='hero-role-review'>{hero.health}</p>
            <label className='review-flip-label'>HPS</label>
            <p className='hero-role-review'>{hero.hps}</p>
          </div>
        </div>
      </div>
    </li>
    ));
    
    //Calculates the stats for specific roster
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
    
    // Returns a list of hero abilities from specific roster
    const abilities = this.props.currentTeam.reduce((abilities, hero) => {
      return [...abilities, ...hero.abilities.map((ability, index) => <li key={hero.heroName + index} className='review-ability'>{ability}</li>)];
    }, []);

    // Returns a list of hero ultimates from specific roster
    const ultimates = this.props.currentTeam.map((hero, index) => (
      <li key={index} className='review-ult'>{hero.ultimate.ultName}</li>
    ));    
    

  
  return(
    <form className="review-build">
      <section className="review-build">
        <section className='review-team-roster'>
          <ul className='review-team'>{currentTeam}</ul>
        </section> 
        <section className='other-lists'>
          <div className='stats-notes-container'>
            <ul className='review-stats'>
              <li className='review-stat'>Damage: {dmgSum} </li>
              <li className='review-stat'>Damage Per Second: {dpsSum}</li>
              <li className='review-stat'>Health: {healthSum}</li>
              <li className='review-stat'>Healing Per Second: {hpsSum}</li>
            </ul>
            <section className='team-notes'>
              <label htmlFor='userNotes' className='notes-label'>Notes</label>
              <textarea aria-label='userNotes' name='userNotes' className='userNotes' placeholder={this.props.teamCollective.notes}></textarea>
            </section>
          </div>
          <section className='review-abilities'>
            <h4 aria-level='2' className='review-abilities-label'>Abilities</h4>
            <ul className='review-abilities-list'>{abilities}</ul>
          </section>
          <section className='review-ultimates'>
            <h4 aria-level='3' className='review-ults-label'>Ultimates</h4>
            <ul className='review-ult-list'>{ultimates}</ul>
          </section>
        </section> 
      </section>
      <Link to='/dashboard'><button className='delete-button' onClick={()=> this.props.dispatch(deleteUserSavedTeam(this.props.teamCollective))}>Delete Build</button></Link>
    </form>
  )
  }
}

function mapStateToProps(state){
  return{
    currentTeam: state.user.currentTeam,
    teamCollective: state.user.teamCollective
  }
}

export default requiresLogin()(connect(mapStateToProps)(ViewForm));