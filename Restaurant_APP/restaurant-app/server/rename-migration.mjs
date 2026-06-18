import { Sequelize } from 'sequelize'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: false
})

async function runMigration() {
  try {
    await sequelize.authenticate()
    console.log('Conectat la db.sqlite. Incep redenumirea...\n')

    // ── TABELE ──────────────────────────────────────────────
    await sequelize.query('ALTER TABLE "Rezervares" RENAME TO "Reservations"')
    console.log('✓ Rezervares → Reservations')

    await sequelize.query('ALTER TABLE "Preparats" RENAME TO "Dishes"')
    console.log('✓ Preparats → Dishes')

    await sequelize.query('ALTER TABLE "Comandas" RENAME TO "Orders"')
    console.log('✓ Comandas → Orders')

    await sequelize.query('ALTER TABLE "ComandaItems" RENAME TO "OrderItems"')
    console.log('✓ ComandaItems → OrderItems')

    await sequelize.query('ALTER TABLE "Mesajs" RENAME TO "Messages"')
    console.log('✓ Mesajs → Messages')

    await sequelize.query('ALTER TABLE "LunaActivas" RENAME TO "ActiveMonths"')
    console.log('✓ LunaActivas → ActiveMonths')

    await sequelize.query('ALTER TABLE "PreparatLunars" RENAME TO "MonthlyDishes"')
    console.log('✓ PreparatLunars → MonthlyDishes')

    // ── COLOANE Users ────────────────────────────────────────
    await sequelize.query('ALTER TABLE "Users" RENAME COLUMN "nume" TO "name"')
    await sequelize.query('ALTER TABLE "Users" RENAME COLUMN "tip" TO "type"')
    console.log('✓ Users: coloane redenumite')

    // ── COLOANE Dishes ───────────────────────────────────────
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "nume" TO "name"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "descriere" TO "description"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "pret" TO "price"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "categorie" TO "category"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "subcategorie" TO "subcategory"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "alergeni" TO "allergens"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "imagine" TO "image"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "disponibil" TO "available"')
    await sequelize.query('ALTER TABLE "Dishes" RENAME COLUMN "tip_vreme" TO "weatherType"')
    console.log('✓ Dishes: coloane redenumite')

    // ── COLOANE Orders ───────────────────────────────────────
    await sequelize.query('ALTER TABLE "Orders" RENAME COLUMN "rezervareId" TO "reservationId"')
    await sequelize.query('ALTER TABLE "Orders" RENAME COLUMN "observatii" TO "notes"')
    console.log('✓ Orders: coloane redenumite')

    // ── COLOANE OrderItems ───────────────────────────────────
    await sequelize.query('ALTER TABLE "OrderItems" RENAME COLUMN "comandaId" TO "orderId"')
    await sequelize.query('ALTER TABLE "OrderItems" RENAME COLUMN "preparatId" TO "dishId"')
    await sequelize.query('ALTER TABLE "OrderItems" RENAME COLUMN "numeSnapshot" TO "nameSnapshot"')
    await sequelize.query('ALTER TABLE "OrderItems" RENAME COLUMN "pretSnapshot" TO "priceSnapshot"')
    await sequelize.query('ALTER TABLE "OrderItems" RENAME COLUMN "cantitate" TO "quantity"')
    console.log('✓ OrderItems: coloane redenumite')

    // ── COLOANE Reservations ─────────────────────────────────
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "data" TO "reservationDate"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "ora" TO "hour"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "nrPersoane" TO "guestCount"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "zona" TO "zone"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "ocazie" TO "occasion"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "observatii" TO "notes"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "anulataNotificat" TO "cancellationNotified"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "anulataDe" TO "cancelledBy"')
    await sequelize.query('ALTER TABLE "Reservations" RENAME COLUMN "confirmatVazut" TO "confirmationSeen"')
    console.log('✓ Reservations: coloane redenumite')

    // ── COLOANE Messages ─────────────────────────────────────
    await sequelize.query('ALTER TABLE "Messages" RENAME COLUMN "nume" TO "name"')
    await sequelize.query('ALTER TABLE "Messages" RENAME COLUMN "intrebare" TO "question"')
    await sequelize.query('ALTER TABLE "Messages" RENAME COLUMN "raspuns" TO "response"')
    await sequelize.query('ALTER TABLE "Messages" RENAME COLUMN "raspunsAt" TO "respondedAt"')
    await sequelize.query('ALTER TABLE "Messages" RENAME COLUMN "citit" TO "isRead"')
    console.log('✓ Messages: coloane redenumite')

    // ── COLOANE ActiveMonths ─────────────────────────────────
    await sequelize.query('ALTER TABLE "ActiveMonths" RENAME COLUMN "tara" TO "country"')
    console.log('✓ ActiveMonths: coloane redenumite')

    // ── COLOANE MonthlyDishes ────────────────────────────────
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "tara" TO "country"')
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "nume" TO "name"')
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "descriere" TO "description"')
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "pret" TO "price"')
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "imagine" TO "image"')
    await sequelize.query('ALTER TABLE "MonthlyDishes" RENAME COLUMN "este_desert" TO "isDessert"')
    console.log('✓ MonthlyDishes: coloane redenumite')

    console.log('\n✅ MIGRARE COMPLETA! Datele sunt intacte, nicio tabelă nu a fost stearsa.')

  } catch (err) {
    console.error('\n❌ Eroare la migrare:', err.message)
    console.error('Opreste-te aici si anunta ce eroare apare.')
  } finally {
    await sequelize.close()
  }
}

runMigration()
