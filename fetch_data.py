import requests
import json
import os

# CONFIGURATION
# We save directly to app/data so Next.js can find it easily
OUTPUT_FOLDER = "app/data"
DATA_URL = "https://dummyjson.com/products/category/smartphones"
STOCK_IMG = "https://images.unsplash.com/photo-1598327105666-5b89351aff70?auto=format&fit=crop&w=600&q=80"

# 1. Create the folder if it doesn't exist
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)
    print(f"Created folder: {OUTPUT_FOLDER}")

print("Contacting Global Database...")

try:
    response = requests.get(DATA_URL)
    raw_data = response.json()
    
    clean_db = []
    
    for item in raw_data['products']: 
        phone_name = item['title']
        # Create a simple ID for the URL
        slug = phone_name.lower().replace(" ", "-").replace("'", "")
        
        # Calculate Part Price (Approx 35% of phone cost)
        full_price = item['price']
        part_price = int(full_price * 0.35)
        if part_price < 20: part_price = 20

        clean_phone = {
            "id": item['id'],
            "model": phone_name,
            "slug": slug,
            "image": item['thumbnail'], # Using real images from the API
            "category": "Smartphone",
            "description": item['description'],
            "price_usd": part_price,
            "difficulty": "Medium" if part_price < 100 else "Hard"
        }
        
        clean_db.append(clean_phone)

    # 2. Save the file
    with open(f"{OUTPUT_FOLDER}/phones.json", "w") as f:
        json.dump(clean_db, f, indent=4)
        
    print(f"SUCCESS! {len(clean_db)} devices imported to '{OUTPUT_FOLDER}/phones.json'.")

except Exception as e:
    print(f"Error: {e}")