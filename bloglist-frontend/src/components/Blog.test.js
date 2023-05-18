import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'Jukka Kukkulan sukka',
    author: 'Jukka Kukkula',
    url: 'www.jukka.fi',
    likes: 5
  }

  render(<Blog blog={blog} />)

  const elementTitleAuthor = screen.getByText('Jukka Kukkulan sukka by Jukka Kukkula')
  expect(elementTitleAuthor).toBeDefined()

  const elementUrl = screen.queryByText('www.jukka.fi')
  expect(elementUrl).toBeNull()

  const elementLikes = screen.queryByText('likes: 5')
  expect(elementLikes).toBeNull()
})
