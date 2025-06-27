def to_camel_case(snake_str: str) -> str:
    """Convert snake_case string to camelCase."""
    if not snake_str:
        return snake_str
    
    # Split by underscore and join with camelCase
    components = snake_str.split('_')
    return components[0] + ''.join(word.capitalize() for word in components[1:])

def to_snake_case(camel_str: str) -> str:
    """Convert camelCase string to snake_case."""
    import re
    # Insert underscore before uppercase letters (except the first character)
    snake_str = re.sub('([a-z0-9])([A-Z])', r'\1_\2', camel_str)
    return snake_str.lower()