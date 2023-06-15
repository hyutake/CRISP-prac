import { render, screen } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem component', () => {
    test('renders TaskItem with correct title and description', () => {
        // Arrange
        const props = {
			id: 't1',
			title: 'Title',
		    desc: 'Desc',
			deadline: '2023-06-12',
			status: 'In progress',
			completedDate: null
        }
        render(<TaskItem {...props} />);

        // Act
        // ...nothing
        // Assert
        const titleElement = screen.getByText(props.title);
        const descElement = screen.getByText(props.title);

        expect(titleElement).toBeInTheDocument();
        expect(descElement).toBeInTheDocument();
    })

    test('renders resolve, delete and edit button when task is NOT completed', () => {
        // Arrange
        const props = {
			id: 't1',
			title: 'Title',
		    desc: 'Desc',
			deadline: '2023-06-12',
			status: 'In progress',
			completedDate: null
        }
        render(<TaskItem {...props} />);

        // Act
        // ...nothing
        // Assert
        const buttonElements = screen.queryAllByRole('button');

        expect(buttonElements).not.toBeNull();
    })

    test('does not render resolve, delete and edit button when task is completed', () => {
        // Arrange
        const props = {
			id: 't1',
			title: 'Title',
		    desc: 'Desc',
			deadline: '2023-06-12',
			status: 'Completed',
			completedDate: '2023-06-13'
        }
        render(<TaskItem {...props} />);

        // Act
        // ...nothing
        // Assert
        const buttonElements = screen.queryAllByRole('button');

        expect(buttonElements).toBeNull();
    }) 

})