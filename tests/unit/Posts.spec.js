import Posts from '@/views/Posts.vue'

describe('Posts.vue', () => {
  it('has a created hook', () => {
    expect(typeof Posts.created).toBe('function')
  })
  // it('sets the correct default data', () => {
  //   expect(typeof Posts.data).toBe('function')
  //   const defaultData = Posts.data()
  //   expect(defaultData.message).toBe('')
  //   expect(defaultData.posts).toEqual([])
  //   expect(defaultData.errors).toEqual([])
  // })
})
