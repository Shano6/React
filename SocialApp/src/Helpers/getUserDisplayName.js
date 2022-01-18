import firebase from '../config/fbConfig'

export let getUserDisplayName = () => {
    if(firebase.auth().currentUser === null){
        setTimeout(() => {
            getUserDisplayName()
      }, 500)
    } else {
        return firebase.auth().currentUser.displayName
    } 
}


