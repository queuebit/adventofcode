#!/bin/bash

# Get input string for day
read -p "Day: " day

# Create the folder
mkdir "days/$day"

# Check if the folder was created successfully
if [ $? -eq 0 ]; then
    echo "Folder '$day' created successfully."
else
    echo "Error creating folder '$day'. Exiting."
    exit 1
fi

template_file="aoc_template.ts"

# Check if the file exists
if [ -e "$template_file" ]; then
    # Copy the file to the created folder
    cp "$template_file" "days/$day/aoc_$day.ts"

    # Check if the copy was successful
    if [ $? -eq 0 ]; then
        echo "File '$template_file' copied to '$day' successfully."
    else
        echo "Error copying file '$template_file' to '$day'. Exiting."
        exit 1
    fi
else
    echo "Error: File '$template_file' does not exist. Exiting."
    exit 1
fi
