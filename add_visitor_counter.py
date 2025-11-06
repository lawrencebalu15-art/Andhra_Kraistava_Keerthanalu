import os
import re

def add_visitor_counter_script(directory):
    html_files = ['index.html', 'hymns.html', 'authors.html', 'about.html', 'contact.html']
    
    for filename in html_files:
        filepath = os.path.join(directory, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r') as f:
            content = f.read()
            
        # Find where the last script tag is
        last_script_pos = content.rfind('</script>')
        if last_script_pos == -1:
            continue
            
        # Find the end of that line
        end_of_line = content.find('\n', last_script_pos)
        if end_of_line == -1:
            end_of_line = len(content)
            
        # Insert our new script tag
        new_content = (
            content[:end_of_line] +
            '\n    <script src="js/visitor-counter.js"></script>' +
            content[end_of_line:]
        )
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        
        print(f"Updated {filename}")

# Get the directory path from the current working directory
directory = os.getcwd()
add_visitor_counter_script(directory)