const clone = require('clone');

let db = {};

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body:
      'Everyone says so after all. Nunc consectetur sollicitudin imperdiet. Sed tincidunt varius scelerisque. Quisque ante lorem, luctus eget facilisis at, ultricies in felis. Nullam nec elit sed risus aliquet sodales sed vitae sem. Aliquam gravida diam ut elit dignissim, quis eleifend risus vulputate. Nulla sit amet eleifend nunc. Mauris ultricies mattis tellus non tincidunt. In hac habitasse platea dictumst. Nulla volutpat enim in erat blandit eleifend. Proin viverra, ante ac congue placerat, neque arcu placerat tellus, ac placerat mi nulla eget est. Fusce accumsan varius mauris, nec sollicitudin nunc maximus at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam quis ligula elit. Nunc et dui et nulla blandit tincidunt id vel velit.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body:
      'Just kidding. It takes more than 10 minutes to learn technology. Nulla non felis pretium, dictum dolor ornare, ultricies quam. Etiam ornare dolor at pharetra varius. Phasellus dignissim eu mi vitae mattis. Cras a lorem sapien. Cras maximus consequat tellus, ut vulputate elit condimentum nec. Cras nulla libero, iaculis quis consequat ac, venenatis id lorem. Nam at quam rutrum, ultrices metus sed, tempor odio. Aenean hendrerit ac risus eget faucibus. Maecenas in arcu et nibh tempus vehicula ac vel odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras odio neque, laoreet in varius nec, vestibulum egestas urna. Nulla sollicitudin est magna, eget rhoncus nisi aliquam vel. Praesent mattis, ex in elementum finibus, diam ex placerat magna, et aliquam arcu mauris vitae risus. Morbi nisl enim, pulvinar non imperdiet vitae.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
  },
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByCategory(token, category) {
  return new Promise((res) => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(
      (key) => posts[key].category === category && !posts[key].deleted
    );
    res(filtered_keys.map((key) => posts[key]));
  });
}

function get(token, id) {
  return new Promise((res) => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise((res) => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter((key) => !posts[key].deleted);
    res(filtered_keys.map((key) => posts[key]));
  });
}

function add(token, post) {
  return new Promise((res) => {
    let posts = getData(token);

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0,
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise((res) => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise((res) => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise((res) => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token);
  if (data[id]) {
    data[id].commentCount += count;
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter,
};
