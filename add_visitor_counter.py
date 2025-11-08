import os

def add_visitor_counter_script(directory):
    html_files = ['index.html', 'hymns.html', 'authors.html', 'about.html', 'contact.html']
    script_tag = '\n    <script src="js/visitor-counter.js"></script>\n'
    
    for filename in html_files:
        filepath = os.path.join(directory, filename)
        if not os.path.exists(filepath):
            print(f"File not found: {filename}")
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        last_script_pos = content.rfind('</script>')
        
        if last_script_pos == -1:
            # No </script> tags found - append at end before </body> or at end of file
            insertion_point = content.rfind('</body>')
            if insertion_point == -1:
                insertion_point = len(content)
            new_content = content[:insertion_point] + script_tag + content[insertion_point:]
        else:
            # Insert just after last </script> tag and continue to end of that line
            end_of_line = content.find('\n', last_script_pos)
            if end_of_line == -1:
                end_of_line = len(content)
            new_content = content[:end_of_line] + script_tag + content[end_of_line:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated {filename}")

if __name__ == '__main__':
    directory = os.getcwd()
    add_visitor_counter_script(directory)
