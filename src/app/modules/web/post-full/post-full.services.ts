import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostFullService {
  getSortedRandomPosts(posts, currentPost) {
    const postsWithImages = posts.filter(post => {
      return post.img.small.length > 0;
    });
    const postsWithoutCurrentOne = postsWithImages.filter(post => {
      return post.id !== currentPost.id;
    });

    return this.shuffle(postsWithoutCurrentOne);
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
