export function seedDatabase(firebase) {
  

    // eslint-disable-next-line prefer-const
  
    // eslint-disable-next-line prefer-const
    let id=0
    for (let i = 1; i <= 7; i++) {
      for (let j = 1; j <= 3; j++) {
          let date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
          id++
          firebase
          .firestore()
          .collection('photos')
          .add({
              photoId: id,
              userId: String(i),
              imageSrc: `/images/users/${id}.jpg`,
              caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              likes: [],
              dislikes: [],
              comments: [
              {
                  displayName: 'Gandhi',
                  comment: 'Lorem ipsum dolor sit amet'
              },
              {
                  displayName: 'Confucius',
                  comment: 'consectetur adipiscing elit '
              }
              ],
              dateCreated: date.valueOf()
        });
      }
    }
  }