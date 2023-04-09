-- Inserer des donnees dans la table'trip'
INSERT INTO trip (trip_id, name, start_date, end_date, user_id)
VALUES ('T001','Vacances d''ete','2022-07-01','2022-07-15' , 1),
       ('T002','Week-end a la montagne','2022-09-10','2022-09-12' , 2),
       ('T003','City trip a Paris','2022-11-01','2022-11-05', 3);

-- Inserer des donnees dans la table'step'
INSERT INTO step (step_id, name, location, start_date, end_date, travel_mode, trip_id)
VALUES
    ('S001','Arrivee a Marseille','Marseille, France','2022-07-01','2022-07-03','Avion', 1),
    ('S002','Plages de la Cote d''Azur','Nice, France','2022-07-03','2022-07-07','Voiture', 1),
    ('S003','Montagnes du Mercantour','Saint-Etienne-de-Tinee, France','2022-07-07','2022-07-12','Train', 1),
    ('S004','Arrivee a Chamonix','Chamonix-Mont-Blanc, France','2022-09-10','2022-09-10','Voiture', 2),
    ('S005','Randonnee au Mont-Blanc','Chamonix-Mont-Blanc, France','2022-09-11','2022-09-11','Pied', 2),
    ('S006','Depart de Chamonix','Chamonix-Mont-Blanc, France','2022-09-12','2022-09-12','Voiture', 2),
    ('S007','Arrivee a Paris','Paris, France','2022-11-01','2022-11-02','Train', 3),
    ('S008','Visite de la Tour Eiffel','Paris, France','2022-11-02','2022-11-03','Metro', 3),
    ('S009','Journee au Louvre','Paris, France','2022-11-03','2022-11-04','Metro', 3);


-- Inserer des donnees dans la table'leisure_item'
INSERT INTO leisure_item (title, subtitle, description, image, category, location, rating, price, date, step_id)
VALUES ('Restaurant La Bonne Mère','Cuisine provençale',
       'Ce restaurant offre une vue imprenable sur Notre-Dame-de-la-Garde','https://example.com/image1.jpg',
       'Restaurants','Marseille, France', 4, 30.5,'2022-07-02', 1),
       ('Musee Matisse','Art moderne','Decouvrez les œuvres du celèbre peintre Henri Matisse',
       'https://example.com/image2.jpg','Musees','Nice, France', 5, 12.0,'2022-07-05', 2),
       ('Parc national du Mercantour','Randonnee et nature','Decouvrez les merveilles du parc national du Mercantour','https://example.com/image3.jpg','Parcs','Saint-Étienne-de-Tinee, France', 5, 0.0,'2022-07-10', 3),
       ('Restaurant La Bergerie','Cuisine traditionnelle','Ce restaurant propose une cuisine savoyarde authentique','https://example.com/image4.jpg','Restaurants','Chamonix-Mont-Blanc, France', 4, 40.0,'2022-09-10', 4),
       ('Telepherique de l''Aiguille du Midi','Panorama exceptionnel','Profitez d''une vue imprenable sur les Alpes','https://example.com/image5.jpg','Sites touristiques','Chamonix-Mont-Blanc, France', 5, 20.0,'2022-09-11', 5),
       ('Musee d''art contemporain du XXIe siècle','Art contemporain','Decouvrez les œuvres des artistes contemporains les plus celèbres','https://example.com/image6.jpg','Musees','Paris, France', 4, 15.0,'2022-11-03', 8),
       ('Tour en bateau sur la Seine','Visite touristique','Profitez d''une croisière sur la Seine pour admirer les monuments de Paris','https://example.com/image7.jpg','Sites touristiques','Paris, France', 4, 25.0,'2022-11-04', 9);
