import { useState, useEffect } from 'react';
import {
	Tag,
	TagLabel,
	TagCloseButton,
	Box,
    Input,
} from '@chakra-ui/react';

function TagInput({ onTagsChange, presentTags }) {
    const [ input, setInput ] = useState('');
    const [ tags, setTags ] = useState(presentTags ? presentTags : []);

    const addTag = tag => {
        setTags([
            ...tags,
            tag
        ]);
        setInput('');
    }

    const removeTag = index => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    const handleKeyDown = e => {
        console.log("e.key", e.key);
        if(e.key === 'Enter') {
            addTag(e.target.value);
        }
    }

    const handleChange = e => {
        setInput(e.target.value);
    }

    useEffect(() => {
        onTagsChange(tags)
    }, [tags]);

	return (
		<>
        {tags &&
            <Box mx={-1} mb={2}>
                {tags.map((tag, index) => {
                    return (
                        <Tag key={tag}>
                            <TagLabel>{tag}</TagLabel>
                            <TagCloseButton onClick={() => removeTag(index)}/>
                        </Tag>
                    )
                })}
            </Box>
        }
        <Input type="text" value={input} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)}/>
		</>
	)
}

export default TagInput;
