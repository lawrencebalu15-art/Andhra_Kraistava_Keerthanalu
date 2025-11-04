#!/usr/bin/env python3
"""Parse PDF data and create structured output"""

import re

def parse_extracted_text():
    """Parse the extracted text file and extract song information"""
    
    with open('extracted_songs.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match song entries: title ... number
    # Format: Song title (Author) ... number
    pattern = r'^([^...]+?)\.\.\.\s*(\d+)$'
    
    songs = []
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line or '...' not in line:
            continue
        
        # Try to extract song number and title
        match = re.search(r'\.\.\.\s*(\d+)$', line)
        if match:
            song_number = int(match.group(1))
            # Extract title (everything before ...)
            title_part = line.rsplit('...', 1)[0].strip()
            
            # Try to extract author if in parentheses
            author_match = re.search(r'\(([^)]+)\)', title_part)
            author = author_match.group(1) if author_match else None
            
            # Clean title (remove author part)
            title = re.sub(r'\([^)]+\)', '', title_part).strip()
            
            songs.append({
                'number': song_number,
                'titleRaw': title_part,
                'title': title,
                'author': author
            })
    
    # Sort by song number
    songs.sort(key=lambda x: x['number'])
    
    return songs

if __name__ == "__main__":
    songs = parse_extracted_text()
    
    print(f"Found {len(songs)} songs")
    print("\nFirst 10 songs:")
    for song in songs[:10]:
        print(f"Song #{song['number']}: {song['title'][:50]}... | Author: {song['author']}")
    
    # Save to JSON-like format for easier import
    with open('songs_parsed.txt', 'w', encoding='utf-8') as f:
        f.write("// Parsed songs from PDF\n")
        f.write("// Format: Song Number | Title | Author\n\n")
        for song in songs:
            f.write(f"{song['number']}|{song['title']}|{song['author'] or 'Unknown'}\n")
    
    print(f"\nSaved {len(songs)} songs to songs_parsed.txt")

