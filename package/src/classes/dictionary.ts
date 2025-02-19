//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,// This Dictionary class was extracted and modified from “Kodkord” by “Kodeko Studios”.
//,,,,,,,,,,,.......,,,,,,,,,,,..........,,,,,,,,,,,// I would appreciate if you visit and support the Kodkord project.
//,,,,,,,,,,,;;;;;;;;,,,,,,,,..:********+,,,,,,,,,,,//
//,,,,,,,,,,:???????*,,,,,,.,:?######@S+,,,,,,,,,,,,// You can see it in the following link:
//,,,,,,,,,,:******+:,,,,.,;%#######%+,.,,,,,,,,,,,,// > https://github.com/KodekoStudios/Kodkord
//,,,,,,,,,,:**?*+:,,,,.,;%#######%;,.,,,,,,,,,,,,,,//
//,,,,,,,,,,:?*+:,,,,.,+%#######%;,.,,,,,,,,,,,,,,,,// Exact place where I extracted it:
//,,,,,,,,,,:+,,,,,.,+S#######?;,.,,,,,,,,,,,,,,,,,,// > https://github.com/KodekoStudios/Kodkord/blob/main/packages/kodkord/src/common/dictionary.ts
//,,,,,,,,,,,,,,,.,+S########S;..,,,,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,,,.:*S############?:.,,,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,.:*S######SS#######S*,.,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,?#######S+,,*S#######S+,.,,,,,,,,,,,,,,//
//,,,,,,,,,.;#######S,.,,.:?########%;..,,,,,,,,,,,,//
//,,,,,,,,,.;#######S,,,,,..;%########?:.,,,,,,,,,,,// Modified by:
//,,,,,,,,,.;#######S,,,,,,,.,;S######@#*,,,,,,,,,,,// > https://github.com/KingsBeCattz
//,,,,,,,,,,:++++++++,,,,,,,,,.,++++++++*;,,,,,,,,,,//
//,,,,,,,,,,,........,,,,,,,,,,,.........,,,,,,,,,,,// Logger maded by:
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,// > https://github.com/Pavez7274
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//
//,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//

export class Dictionary<K, V> extends Map<K, V> {
	/**
	 * Filters the entries of the dictionary based on the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` to keep the entry, `false` otherwise.
	 * @returns A new `Dictionary` with the filtered entries.
	 */
	public filter(
		callback: (value: V, key: K, dict: this) => boolean
	): Dictionary<K, V> {
		return new Dictionary(
			[...this].filter(([key, value]) => callback(value, key, this))
		);
	}

	/**
	 * Finds the first value in the dictionary that satisfies the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for the desired entry.
	 * @returns The first value that satisfies the callback, or `undefined` if none do.
	 */
	public find(
		callback: (value: V, key: K, dict: this) => boolean
	): undefined | V {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return VALUE;
			}
		}

		return undefined;
	}

	/**
	 * Tests whether all entries in the dictionary pass the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for entries that pass.
	 * @returns `true` if all entries pass the callback, otherwise `false`.
	 */
	public every(callback: (value: V, key: K, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (!callback(VALUE, KEY, this)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Tests whether at least one entry in the dictionary passes the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for entries that pass.
	 * @returns `true` if at least one entry passes the callback, otherwise `false`.
	 */
	public some(callback: (value: V, key: K, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Reduces the dictionary's entries to a single value using the provided callback.
	 *
	 * @param callback A function to process each entry.
	 * @param initial The initial accumulator value.
	 * @returns The result of the reduction.
	 */
	public reduce<T>(
		callback: (accumulator: T, value: V, key: K, dict: this) => T,
		initial: T
	): T {
		return [...this].reduce(
			(acc, [key, value]) => callback(acc, value, key, this),
			initial
		);
	}

	/**
	 * Maps the dictionary's entries to a new `Dictionary` with transformed values.
	 *
	 * @param callback A function to transform each entry.
	 * @returns A new `Dictionary` with the mapped values.
	 */
	public map<T>(
		callback: (value: V, key: K, dict: this) => T
	): Dictionary<K, T> {
		return new Dictionary(
			[...this].map(([key, value]) => [key, callback(value, key, this)] as const)
		);
	}

	/**
	 * Retrieves the first value in the dictionary.
	 *
	 * @returns The first value, or `undefined` if the dictionary is empty.
	 */
	public first(): undefined | V {
		return this.values().next().value;
	}

	/**
	 * Retrieves the last value in the dictionary.
	 *
	 * @returns The last value, or `undefined` if the dictionary is empty.
	 */
	public last(): undefined | V {
		return [...this.values()].at(-1);
	}

	/**
	 * Creates a shallow copy of the dictionary.
	 *
	 * @returns A new `Dictionary` instance with the same entries, limit, and name.
	 */
	public clone(): Dictionary<K, V> {
		return new Dictionary([...this]);
	}
}
